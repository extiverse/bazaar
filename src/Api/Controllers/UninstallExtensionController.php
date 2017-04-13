<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Api\Serializers\ExtensionSerializer;
use Flagrow\Bazaar\Extensions\ExtensionManager;
use Flagrow\Bazaar\Repositories\ExtensionRepository;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UninstallExtensionController extends AbstractResourceController
{
    use AssertPermissionTrait;

    public $serializer = ExtensionSerializer::class;

    /**
     * @var ExtensionRepository
     */
    protected $extensions;
    /**
     * @var ExtensionManager
     */
    private $manager;

    /**
     * @param ExtensionManager $manager
     * @param ExtensionRepository $extensions
     */
    public function __construct(ExtensionManager $manager, ExtensionRepository $extensions)
    {
        $this->extensions = $extensions;
        $this->manager = $manager;
    }

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $extensionId = array_get($request->getQueryParams(), 'id');

        $this->manager->uninstall($extensionId);

        return $this->extensions->getExtension($extensionId);
    }
}
