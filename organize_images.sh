#!/bin/bash
cd /home/user/archities/src/assets/images

# Move all numbered renders (1-22.jpg)
counter=1
for i in {1..22}; do
  if [ -f "${i}.jpg" ]; then
    cp "${i}.jpg" "renders/render-${counter}.jpg"
    ((counter++))
  fi
done

# Move WhatsApp renders
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM.jpeg" "renders/living-room-view-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (1).jpeg" "renders/dining-area-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (2).jpeg" "renders/bedroom-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (3).jpeg" "renders/kitchen-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (4).jpeg" "renders/living-tv-wall-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (5).jpeg" "renders/bedroom-02.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (6).jpeg" "renders/dining-pooja-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (7).jpeg" "renders/bedroom-03.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.54 AM (8).jpeg" "renders/entry-display-unit.jpg"

# Move WhatsApp reality photos
cp "WhatsApp Image 2025-12-19 at 6.09.55 AM.jpeg" "reality/feature-wall-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.56 AM.jpeg" "reality/kitchen-execution-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.56 AM (5).jpeg" "reality/kitchen-golden-hardware.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.56 AM (10).jpeg" "reality/bedroom-wardrobe-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.57 AM.jpeg" "reality/living-partition-wall.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.57 AM (1).jpeg" "reality/modular-kitchen-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.57 AM (2).jpeg" "reality/bedroom-execution-01.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.57 AM (3).jpeg" "reality/tv-unit-black-gold.jpg"
cp "WhatsApp Image 2025-12-19 at 6.09.58 AM (5).jpeg" "reality/tv-wall-execution-01.jpg"

echo "✓ Images organized successfully!"
echo "Renders: $(ls renders/*.jpg 2>/dev/null | wc -l)"
echo "Reality: $(ls reality/*.jpg 2>/dev/null | wc -l)"
