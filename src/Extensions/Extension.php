<?php

namespace Flagrow\Bazaar\Extensions;

use Composer\Semver\Comparator;
use Flagrow\Bazaar\Models\Task;
use Flarum\Extension\Extension as InstalledExtension;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Arr;

class Extension implements Arrayable
{
    /**
     * @var string
     */
    public $id;

    /**
     * @var array
     */
    protected $attributes = [];

    /**
     * @var InstalledExtension
     */
    protected $installedExtension;

    /**
     * @param string $id Extension `vendor/package` identifier
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    public static function createFromAttributes($attributes)
    {
        $extension = new Extension(ExtensionUtils::packageToId($attributes['name']));
        $extension->attributes = $attributes;

        return $extension;
    }

    /**
     * Bind this extension to an installed extension
     * @param InstalledExtension|null $extension
     */
    public function setInstalledExtension(InstalledExtension $extension = null)
    {
        $this->installedExtension = $extension;
    }

    /**
     * @return InstalledExtension
     */
    public function getInstalledExtension()
    {
        return $this->installedExtension;
    }

    /**
     * Get the Flarum extension id to search in the base ExtensionManager
     * @return string Flarum extension manager id
     */
    public function getShortName()
    {
        return ExtensionUtils::idToShortName($this->id);
    }

    /**
     * Short function to map attributes that can only be found in the $attributes array
     * @param string $attribute
     * @param null $default
     * @return mixed|null
     */
    protected function getAttributeIfPresent($attribute, $default = null)
    {
        return Arr::get($this->attributes, $attribute, $default);
    }

    public function getPackage()
    {
        return Arr::get(
            $this->attributes,
            'name',
            ExtensionUtils::idToPackage($this->id)
        );
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return Arr::get($this->attributes, 'title', 'Unknown');
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return Arr::get($this->attributes, 'description', '');
    }

    public function isInstalled()
    {
        // We dont need to check $this->installedExtension->isInstalled() because it's always true at the moment
        return $this->installedExtension !== null;
    }

    /**
     * @return null|string
     */
    public function getInstalledVersion()
    {
        if ($this->installedExtension) {
            return $this->installedExtension->getVersion();
        }

        return null;
    }

    public function isEnabled()
    {
        if ($this->installedExtension) {
            return $this->installedExtension->isEnabled();
        }

        return false;
    }

    /**
     * Loads the icon information from the composer.json.
     *
     * Files are not locally or remotely available.
     *
     * @return array|null
     */
    public function getIcon()
    {
        if ($this->installedExtension) {
            return $this->installedExtension->getIcon();
        }
        if (($icon = $this->getAttributeIfPresent('icon'))) {

            if (Arr::has($icon, 'image')) {
                $icon['backgroundImage'] = sprintf("url('%s')", $icon['image']);
            }

            return $icon;
        }

        return null;
    }

    /**
     * Whether the package is outdated.
     *
     * @return bool|null
     */
    public function isOutdated()
    {
        if (!$this->isInstalled()) {
            return null;
        }

        return Comparator::lessThan(
            $this->getInstalledVersion(),
            $this->getAvailableVersion()
        );
    }

    /**
     * @return bool
     */
    public function isPending()
    {
        return Task::query()
            ->where('package', $this->getPackage())
            ->whereNull('started_at')
            ->whereNull('finished_at')
            ->count() > 0;
    }

    public function locale()
    {
        return $this->getAttributeIfPresent('locale');
    }

    public function getAvailableVersion()
    {
        return $this->getAttributeIfPresent('highest_version');
    }

    /**
     * @inheritdoc
     */
    public function toArray()
    {
        return [
            'id' => $this->id,
            'package' => $this->getPackage(),
            'title' => $this->getTitle(),
            'description' => $this->getDescription(),
            'icon' => $this->getIcon(),
            'license' => $this->getAttributeIfPresent('license'),
            'downloads' => $this->getAttributeIfPresent('downloads'),
            'locale' => $this->locale(),
            'installed' => $this->isInstalled(),
            'pending' => $this->isPending(),
            'enabled' => $this->isEnabled(),
            'installed_version' => $this->getInstalledVersion(),
            'highest_version' => $this->getAvailableVersion(),
            'outdated' => $this->isOutdated(),
            'discuss_link' => $this->getAttributeIfPresent('discussLink'),
            'landing_link' => $this->getAttributeIfPresent('landingPageLink'),
            'flarum_id' => $this->installedExtension ? $this->installedExtension->getId() : null,
            'favorites' => $this->getAttributeIfPresent('amount_of_favorites', 0),
            'favorited' => $this->getAttributeIfPresent('favorited', false),
            'premium' => $this->getAttributeIfPresent('premiumEnabled', false),
            'subscribed' => $this->getAttributeIfPresent('subscribed', false),
            'canCheckout' => $this->getAttributeIfPresent('canCheckout', false),
            'canUnsubscribe' => $this->getAttributeIfPresent('canUnsubscribe', false),
        ];
    }
}
