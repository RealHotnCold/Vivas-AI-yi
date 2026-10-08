from __future__ import annotations
import asyncio
import time
from collections.abc import Awaitable, Callable
from typing import TypeVar

T = TypeVar("T")


class AsyncTTLCache:
    """Small in-process cache; source failures are never cached."""

    def __init__(self, ttl_seconds: int) -> None:
        self.ttl_seconds = ttl_seconds
        self._values: dict[str, tuple[float, object]] = {}
        self._lock: asyncio.Lock | None = None

    async def get_or_load(self, key: str, loader: Callable[[], Awaitable[T]]) -> T:
        now = time.monotonic()
        # FastAPI builds sync dependencies in a worker thread; bind the lock to
        # the request loop instead of requiring a loop at service construction.
        if self._lock is None:
            self._lock = asyncio.Lock()
        async with self._lock:
            cached = self._values.get(key)
            if cached and cached[0] > now:
                return cached[1]  # type: ignore[return-value]
        value = await loader()
        async with self._lock:
            self._values[key] = (time.monotonic() + self.ttl_seconds, value)
        return value
