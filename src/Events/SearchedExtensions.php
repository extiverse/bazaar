<?php

namespace Flagrow\Bazaar\Events;

use Illuminate\Database\Eloquent\Collection as Eloquent;
use Illuminate\Support\Collection;

class SearchedExtensions
{
    /**
     * @var Eloquent
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

    public function __construct(Eloquent $extensions, Collection $params, bool $hasMore)
    {
        $this->extensions = $extensions;
        $this->params = $params;
        $this->hasMore = $hasMore;
    }
}
