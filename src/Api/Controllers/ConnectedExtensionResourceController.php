<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Api\Serializers\ExtensionSerializer;
use Flagrow\Bazaar\Repositories\ExtensionRepository;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Settings\SettingsRepositoryInterface;


abstract class ConnectedExtensionResourceController extends AbstractResourceController
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
