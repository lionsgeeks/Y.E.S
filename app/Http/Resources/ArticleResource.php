<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $rawTags = $this->tags ?? [];
        // normalize to arrays per locale
        $normalize = function ($val, $sep) {
            if (is_array($val)) {
                return array_values(array_filter(array_map('trim', $val), fn($v) => $v !== ''));
            }
            if (is_string($val)) {
                $parts = array_map('trim', explode($sep, $val));
                // also split by comma if arabic sep not present
                if (count($parts) === 1) {
                    $parts = array_map('trim', explode(',', $val));
                }
                return array_values(array_filter($parts, fn($v) => $v !== ''));
            }
            return [];
        };

        $tagsEn = $normalize(is_object($rawTags) ? ($rawTags->en ?? null) : ($rawTags['en'] ?? null), ',');
        $tagsAr = $normalize(is_object($rawTags) ? ($rawTags->ar ?? null) : ($rawTags['ar'] ?? null), '،');

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'tags' => [
                'en' => $tagsEn,
                'ar' => $tagsAr,
            ],
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
