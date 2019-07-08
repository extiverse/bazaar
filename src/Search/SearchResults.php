<?php

namespace Extiverse\Bazaar\Search;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class SearchResults
{
    /**
     * @var Collection
     */
    protected $results;
    protected $pages_total;
    protected $pages_current;
    protected $items_count;
    protected $items_total;
    protected $items_per_page;
    /**
     * @var array
     */
    private $meta;

    /**
     * @param Collection $results
     * @param array      $meta
     */
    public function __construct(Collection $results, array $meta = [])
    {
        $this->results = $results;

        $this->pages_total = (int) Arr::get($meta, 'pages_total', 0);
        $this->pages_current = (int) Arr::get($meta, 'pages_current', 0);
        $this->items_count = (int) Arr::get($meta, 'items_count', 0);
        $this->items_total = (int) Arr::get($meta, 'items_total', 0);
        $this->items_per_page = (int) Arr::get($meta, 'items_per_page', 25);

        $this->meta = $meta;
    }
    public function getResults(): Collection
    {
        return $this->results;
    }
    public function areMoreResults(): bool
    {
        return $this->pages_total > $this->pages_current;
    }

    public function getMeta(): array
    {
        return $this->meta;
    }
}
