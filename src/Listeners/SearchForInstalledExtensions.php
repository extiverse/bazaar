<?php

namespace Flagrow\Bazaar\Listeners;

use Flagrow\Bazaar\Events\SearchingExtensions;
use Flagrow\Bazaar\Extensions\ExtensionUtils;
use Flarum\Extension\Extension;
use Flarum\Extension\ExtensionManager;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Collection;

class SearchForInstalledExtensions
{
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
        $filter = $event->params->get('filter');

        if (in_array($filter, 'installed', 'update_required')) {
            // mutate the api params to use the installedExtensions
        }
    }
}
