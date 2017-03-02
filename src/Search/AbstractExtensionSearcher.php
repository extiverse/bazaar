<?php

namespace Flagrow\Bazaar\Search;

use Flarum\Core\Search\SearchResults;

abstract class AbstractExtensionSearcher
{
    /**
     * @param int $limit
     * @param int $offset
     * @return SearchResults
     */
    public abstract function search($limit = null, $offset = 0);
}
