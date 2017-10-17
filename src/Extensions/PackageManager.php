<?php

namespace Flagrow\Bazaar\Extensions;

use Flagrow\Bazaar\Jobs\RemovePackage;
use Flagrow\Bazaar\Jobs\RequirePackage;
use Flagrow\Bazaar\Models\Task;
use Flarum\Settings\SettingsRepositoryInterface;

class PackageManager
{
    /**
     * @var bool
     */
    protected $useCron;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->useCron = $settings->get('flagrow.bazaar.use_cron_for_tasks', false);
    }

    /**
     * Create and run an update job
     * RequirePackage is used behind the scene as we do not want to update any other dependency
     * But we need a separate method from requirePackage to correctly log the "update" in the task list
     * @param string $package
     */
    public function updatePackage($package)
    {
        $task = Task::build('update', $package, RequirePackage::class);

        if (!$this->useCron) {
            RequirePackage::launchJob($task);
        }
    }

    /**
     * Create and run the InstallPackage job
     * @param string $package
     */
    public function requirePackage($package)
    {
        $task = Task::build('install', $package, RequirePackage::class);

        if (!$this->useCron) {
            RequirePackage::launchJob($task);
        }
    }

    /**
     * Create and run the RemovePackage job
     * @param string $package
     */
    public function removePackage($package)
    {
        $task = Task::build('uninstall', $package, RemovePackage::class);

        if (!$this->useCron) {
            RemovePackage::launchJob($task);
        }
    }
}
