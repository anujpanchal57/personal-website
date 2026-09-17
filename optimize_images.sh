#!/bin/bash
# Usage: ./optimize_images.sh <image.png|jpg|jpeg> [hero|work|cert]
# Resizes + compresses the image and writes it into assets/ (hero -> assets/, work -> assets/selected-work/, cert -> assets/certifications/).
set -e

src="$1"; kind="${2:-hero}"
[ -f "$src" ] || { echo "Usage: $0 <image.png|jpg|jpeg> [hero|work|cert]"; exit 1; }

case "$kind" in
  hero) max=1600; dir=assets ;;
  work) max=800;  dir=assets/selected-work ;;
  cert) max=600;  dir=assets/certifications ;;
  *) echo "kind must be hero|work|cert"; exit 1 ;;
esac

name=$(basename "$src"); base="${name%.*}"; ext=$(echo "${name##*.}" | tr 'A-Z' 'a-z')
case "$ext" in png|jpg|jpeg) ;; *) echo "only png/jpg/jpeg supported"; exit 1 ;; esac

# ponytail: photos (hero) become jpeg@80 for size; work/cert stay png so screenshots/logos keep transparency and crisp text
if [ "$kind" = hero ]; then
  out="$dir/$base.jpg"
  sips -s format jpeg -s formatOptions 80 -Z "$max" "$src" --out "$out" >/dev/null
else
  out="$dir/$base.$ext"
  sips -Z "$max" "$src" --out "$out" >/dev/null
fi

echo "Wrote $out ($(sips -g pixelWidth -g pixelHeight "$out" | awk '/pixel/{printf "%s ",$2}')px, $(du -h "$out" | cut -f1))"
