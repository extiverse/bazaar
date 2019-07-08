<?php

namespace Extiverse\Bazaar\Listeners;

use Extiverse\Bazaar\Events\SearchingExtensions;
use Extiverse\Bazaar\Extensions\ExtensionUtils;
use Flarum\Extension\Extension;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class SearchForInstalledExtensions
{
    const MARKS = ['installed', 'update', 'pending'];

    /**
     * @var Collection
     */
    protected $installedExtensions;
    /**
     * @var ExtensionManager
     */
    private $extensions;

    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
        $this->installedExtensions = $extensions
            ->getExtensions()
            ->map(function (Extension $extension) {
                return ExtensionUtils::packageToId($extension->name);
            });
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(SearchingExtensions::class, [$this, 'installed']);
    }

    public function installed(SearchingExtensions $event)
    {
        $filter = (array) $event->params->pull('filter', []);
        $is = Arr::get($filter, 'is', []);

        collect($is)
            ->first(function ($key) use (&$event, &$filter) {
                if (in_array($key, static::MARKS, true)) {
                    $filter['id'] = $this->installedExtensions->implode(',');

                    return true;
                }
            });

        foreach (static::MARKS as $mark) {
            if (($key = array_search($mark, $is)) !== false) {
                unset($is[$key]);
            }
        }

        $filter['is'] = $is;

        $event->params->put('filter', $filter);
    }
}
