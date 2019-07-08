<?php

namespace Extiverse\Bazaar\Listeners;

use Extiverse\Bazaar\Composer\ComposerEnvironment;
use Extiverse\Bazaar\Jobs\ComposerJob;
use Extiverse\Bazaar\Search\FlagrowApi;
use Extiverse\Bazaar\Traits\FileSizeHelper;
use Flarum\Settings\Event\Deserializing;
use Illuminate\Events\Dispatcher;

class AddApiAttributes
{
    use FileSizeHelper;

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Deserializing::class, [$this, 'addAdminAttributes']);
    }

    /**
     * @param Deserializing $event
     */
    public function addAdminAttributes(Deserializing $event)
    {
        $event->settings['flagrow.bazaar.flagrow-host'] = FlagrowApi::getFlagrowHost();
        $event->settings['flagrow.bazaar.php.memory_limit-met'] = $this->memoryLimitMet();
        $event->settings['flagrow.bazaar.php.memory_limit'] = ini_get('memory_limit');
        $event->settings['flagrow.bazaar.php.memory_requested'] = ComposerJob::MEMORY_REQUESTED;
        $event->settings['flagrow.bazaar.file-permissions'] = $this->retrieveFilePermissions();
    }

    protected function retrieveFilePermissions()
    {
        return app(ComposerEnvironment::class)->retrieveFilePermissions();
    }

    protected function memoryLimitMet()
    {
        $limit = ini_get('memory_limit');

        // memory_limit is always returned as a string, '-1' means unlimited
        if ($limit === '-1') {
            return true;
        }

        $required = $this->sizeToByte(ComposerJob::MEMORY_REQUESTED);

        return $this->sizeToByte($limit) >= $required;
    }
}
