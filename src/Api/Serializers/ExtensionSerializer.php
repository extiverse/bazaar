<?php

namespace Flagrow\Bazaar\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class ExtensionSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'extensions';

    /**
     * {@inheritdoc}
     *
     * @param array $extension
     */
    public function getDefaultAttributes($extension)
    {
        // At the moment we only return the array data from the ExtensionManager
        return $extension;
    }
}
