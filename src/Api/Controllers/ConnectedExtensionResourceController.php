<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Api\Serializers\ExtensionSerializer;
use Extiverse\Bazaar\Repositories\ExtensionRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Exception\PermissionDeniedException;

abstract class ConnectedExtensionResourceController extends AbstractShowController
{
    /**
     * @var ExtensionSerializer
     */
    public $serializer = ExtensionSerializer::class;

    /**
     * @var bool
     */
    protected $connected;

    /**
     * @var ExtensionRepository
     */
    protected $extensions;

    function __construct(SettingsRepositoryInterface $settings, ExtensionRepository $extensions)
    {
        $this->connected = $settings->get('flagrow.bazaar.connected') === '1';
        $this->extensions = $extensions;
    }

    /**
     * Re-usable function to check the install is connected before doing anything
     * @throws PermissionDeniedException
     */
    protected function checkConnected()
    {
        if (!$this->connected) {
            throw new PermissionDeniedException("Bazaar not connected");
        }
    }
}
