<?php

namespace Extiverse\Bazaar\Events;

use Illuminate\Support\Collection;

class SearchedExtensions
{
    /**
     * @var Collection
     */
    public $extensions;
    /**
     * @var Collection
     */
    public $params;
    /**
     * @var bool
     */
    public $hasMore;
    /**
     * @var array
     */
    public $meta;

    /**
     * SearchedExtensions constructor.
     *
     * @param Collection   $extensions
     * @param Collection $params
     * @param array      $meta
     */
    public function __construct(Collection $extensions, Collection $params, array &$meta = [])
    {
        $this->extensions = $extensions;
        $this->params = $params;
        $this->meta = &$meta;
    }
}
