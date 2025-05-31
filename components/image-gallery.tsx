"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    description?: string
  }[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openGallery = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeGallery = () => {
    setSelectedIndex(null)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [selectedIndex, images.length])

  const goToNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [selectedIndex, images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      switch (e.key) {
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case "Escape":
          closeGallery()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, goToPrevious, goToNext])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[9/16] cursor-pointer rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors"
            onClick={() => openGallery(index)}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={closeGallery} className="text-white hover:bg-gray-800">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 text-white hover:bg-gray-800 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="relative h-full max-h-[80vh] w-auto max-w-[90vw] flex items-center justify-center">
              <Image
                src={images[selectedIndex].src || "/placeholder.svg"}
                alt={images[selectedIndex].alt}
                width={500}
                height={900}
                className="h-auto max-h-[80vh] w-auto max-w-[90vw] object-contain"
                priority
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 text-white hover:bg-gray-800 z-10"
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {images[selectedIndex].description && (
            <div className="p-4 text-center text-white">
              <p>{images[selectedIndex].description}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
