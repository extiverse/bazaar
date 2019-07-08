<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Api\Serializers\ExtensionSerializer;
use Extiverse\Bazaar\Repositories\ExtensionRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\User\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UninstallExtensionController extends AbstractShowController
{
    use AssertPermissionTrait;

    public $serializer = ExtensionSerializer::class;

    /**
     * @var ExtensionRepository
     */
    protected $extensions;

    /**
     * @param ExtensionRepository $extensions
     */
    public function __construct(ExtensionRepository $extensions)
    {
        $this->extensions = $extensions;
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

        return $this->extensions->removeExtension($extensionId);
    }
}
