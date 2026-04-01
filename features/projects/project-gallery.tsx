"use client";

import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectGalleryProps {
  images: any[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="mb-8 inline-block border-b-4 border-foreground pb-2 text-2xl font-black uppercase tracking-widest md:text-3xl">
        PROJECT GALLERY
      </h3>

      {/* Gallery Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden border-4 border-foreground bg-card shadow-[8px_8px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[12px_12px_0px_0px_hsl(var(--foreground))]"
            onClick={() => openModal(index)}
          >
            <Image
              src={urlFor(image).width(400).height(300).url()}
              alt={`${title} - Image ${index + 1}`}
              width={400}
              height={300}
              className="h-auto w-full object-cover grayscale-[20%] transition-none group-hover:grayscale-0"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center pt-8">
            {/* Close Button */}
            <Button
              type="button"
              onClick={closeModal}
              className="absolute -top-16 right-0 z-10 flex h-14 w-14 items-center justify-center border-4 border-background bg-foreground text-background transition-none hover:bg-background hover:text-foreground"
            >
              <X size={36} className="stroke-[3]" />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute -left-16 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center border-4 border-background bg-foreground text-background hover:-translate-x-[4px] hover:bg-background hover:text-foreground sm:left-4 sm:h-20 sm:w-20"
                >
                  <ChevronLeft size={48} className="stroke-[3]" />
                </Button>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute -right-16 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center border-4 border-background bg-foreground text-background hover:translate-x-[4px] hover:bg-background hover:text-foreground sm:right-4 sm:h-20 sm:w-20"
                >
                  <ChevronRight size={48} className="stroke-[3]" />
                </Button>
              </>
            )}

            {/* Image */}
            <div className="border-8 border-background bg-foreground p-2 shadow-[16px_16px_0px_0px_#000] md:p-4">
              <Image
                src={urlFor(images[selectedImage])
                  .width(1200)
                  .height(800)
                  .url()}
                alt={`${title} - Image ${selectedImage + 1}`}
                width={1200}
                height={800}
                className="max-h-[75vh] max-w-[80vw] bg-background object-contain sm:max-w-[85vw]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 border-4 border-background bg-foreground px-6 py-2 text-2xl font-black tracking-widest text-background">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
