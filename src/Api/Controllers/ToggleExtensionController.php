<?php

namespace Extiverse\Bazaar\Api\Controllers;

use Extiverse\Bazaar\Api\Serializers\ExtensionSerializer;
use Extiverse\Bazaar\Extensions\ExtensionUtils;
use Extiverse\Bazaar\Repositories\ExtensionRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Extension\ExtensionManager;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ToggleExtensionController extends AbstractShowController
{
    use AssertPermissionTrait;

    public $serializer = ExtensionSerializer::class;
    /**
     * @var ExtensionRepository
     */
    private $extensions;
    /**
     * @var ExtensionManager
     */
    private $manager;

    function __construct(ExtensionRepository $extensions, ExtensionManager $manager)
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

        $enabled = Arr::get($request->getParsedBody(), 'enabled');
        $id = Arr::get($request->getQueryParams(), 'id');

        $shortName = ExtensionUtils::idToShortName($id);

        if ($enabled === true) {
            $this->manager->enable($shortName);
        } else {
            $this->manager->disable($shortName);
        }

        return $this->extensions->getExtension($id);
    }
}
