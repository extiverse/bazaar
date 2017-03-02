<?php

namespace Flagrow\Bazaar\Extensions;

use Flarum\Extension\Extension as InstalledExtension;
use Illuminate\Contracts\Support\Arrayable;

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
        if (array_key_exists($attribute, $this->attributes)) {
            return $this->attributes[$attribute];
        }

        return null;
    }

    public function getPackage()
    {
        if (array_key_exists('name', $this->attributes)) {
            return $this->attributes['name'];
        }

        return ExtensionUtils::idToPackage($this->id);
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        if (array_key_exists('title', $this->attributes)) {
            return $this->attributes['title'];
        }

        return 'Unknown';
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        if (array_key_exists('description', $this->attributes)) {
            return $this->attributes['description'];
        }

        return 'Unknown';
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
            'license' => $this->getAttributeIfPresent('license'),
            'stars' => $this->getAttributeIfPresent('stars'),
            'forks' => $this->getAttributeIfPresent('forks'),
            'downloads' => $this->getAttributeIfPresent('downloads'),
            'installed' => $this->isInstalled(),
            'enabled' => $this->isEnabled(),
            'installed_version' => $this->getInstalledVersion(),
        ];
    }
}
