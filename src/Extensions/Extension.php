<?php

namespace Flagrow\Bazaar\Extensions;

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
    protected $installedExtension = null;

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
     * @param InstalledExtension $extension
     */
    public function setInstalledExtension(InstalledExtension $extension)
    {
        $this->installedExtension = $extension;
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
     * @return mixed|null
     */
    protected function getAttributeIfPresent($attribute)
    {
        return Arr::get($this->attributes, $attribute);
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
        return is_object($this->installedExtension);
    }

    public function getInstalledVersion()
    {
        if (is_object($this->installedExtension)) {
            return $this->installedExtension->getVersion();
        }

        return null;
    }

    public function isEnabled()
    {
        if (is_object($this->installedExtension)) {
            return $this->installedExtension->isEnabled();
        }

        return false;
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
            'icon' => $this->getAttributeIfPresent('icon'),
            'license' => $this->getAttributeIfPresent('license'),
            'stars' => $this->getAttributeIfPresent('stars'),
            'forks' => $this->getAttributeIfPresent('forks'),
            'downloads' => $this->getAttributeIfPresent('downloads'),
            'installed' => $this->isInstalled(),
            'enabled' => $this->isEnabled(),
            'installed_version' => $this->getInstalledVersion(),
            'highest_version' => $this->getAttributeIfPresent('highest_version')
        ];
    }
}
