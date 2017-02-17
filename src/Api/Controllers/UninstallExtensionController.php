<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Extension\ExtensionManager;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\EmptyResponse;

class UninstallExtensionController extends AbstractDeleteController
{
    use AssertPermissionTrait;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    /**
     * @param ExtensionManager $extensions
     */
    public function __construct(ExtensionManager $extensions)
    {
        $this->extensions = $extensions;
    }

    /**
     * {@inheritdoc}
     */
    protected function delete(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $shortName = array_get($request->getQueryParams(), 'name');

        $this->extensions->uninstall($shortName);

        return new EmptyResponse(204);
    }
}
