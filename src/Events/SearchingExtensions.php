<?php

namespace Extiverse\Bazaar\Events;

use Illuminate\Support\Collection;

class SearchingExtensions
{
    /**
     * @var Collection
     */
    public $params;

    public function __construct(Collection $params)
    {
        $this->params = $params;
    }
}
