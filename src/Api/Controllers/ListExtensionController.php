<?php

namespace Flagrow\Bazaar\Api\Controllers;

use Flagrow\Bazaar\Api\Serializers\ExtensionSerializer;
use Flagrow\Bazaar\Repositories\ExtensionRepository;
use Flagrow\Bazaar\Search\AbstractExtensionSearcher;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\UrlGenerator;
use Flarum\User\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\Parameters;

class ListExtensionController extends AbstractListController
{
    use AssertPermissionTrait;

    /**
     * @inheritdoc
     */
    public $serializer = ExtensionSerializer::class;

    /**
     * @var UrlGenerator
     */
    protected $url;
    /**
     * @var ExtensionRepository
     */
    protected $extensions;

    public function __construct(ExtensionRepository $extensions, UrlGenerator $url)
    {
        $this->url = $url;
        $this->extensions = $extensions;
    }

    /**
     * @inheritdoc
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $offset = $this->extractOffset($request);

        $results = $this->extensions->index($request);

        $document->addPaginationLinks(
            $this->url->to('api')->route('bazaar.extensions.index'),
            $request->getQueryParams(),
            $offset,
            1,
            $results->areMoreResults() ? null : 0
        );

        return $results->getResults();
    }
}
