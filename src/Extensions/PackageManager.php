<?php

namespace Extiverse\Bazaar\Extensions;

use Extiverse\Bazaar\Jobs\RemovePackage;
use Extiverse\Bazaar\Jobs\RequirePackage;
use Extiverse\Bazaar\Models\Task;
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
     * @param $command
     * @param $package
     * @param $class
     * @return Task
     */
    protected function build($command, $package, $class)
    {
        if (!$this->useCron) {
            $class = null;
        }

        $task = Task::build($command, $package, $class);

        $task->save();

        return $task;
    }

    /**
     * Create and run an update job
     * RequirePackage is used behind the scene as we do not want to update any other dependency
     * But we need a separate method from requirePackage to correctly log the "update" in the task list
     * @param string $package
     */
    public function updatePackage($package)
    {
        $task = $this->build('update', $package, RequirePackage::class);

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
        $task = $this->build('install', $package, RequirePackage::class);

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
        $task = $this->build('uninstall', $package, RemovePackage::class);

        if (!$this->useCron) {
            RemovePackage::launchJob($task);
        }
    }
}
