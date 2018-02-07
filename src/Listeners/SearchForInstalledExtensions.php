<?php

namespace Flagrow\Bazaar\Listeners;

use Flagrow\Bazaar\Events\SearchingExtensions;
use Flagrow\Bazaar\Extensions\ExtensionUtils;
use Flarum\Extension\Extension;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class SearchForInstalledExtensions
{
    const MARKS = ['installed', 'update_required'];

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

        collect($filter)
            ->keys()
            ->first(function ($key) use (&$event, &$filter) {
                if (in_array($key, static::MARKS, true)) {
                    $filter['id'] = $this->installedExtensions->implode(',');
                }
            });

        Arr::forget($filter, static::MARKS);

        $event->params->put('filter', $filter);
    }
}
