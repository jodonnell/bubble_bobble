require 'RMagick'
include Magick

original_image = ImageList.new("bubblebobble_bubandbub_sheet.png")

images = ['bub', 'bub_tail', 'bub_walk_tail', 'bub_walk', 'bub_jump', 'bub_jump_tail', 'bub_fall_tail', 'bub_fall']

8.times do |num|
  image = original_image.crop((num * 30) + 1, 69, 16, 17)
  image = image.scale(3)
  image.write("#{images[num]}.png")
  image = image.flop
  image.write("#{images[num]}_left.png")
end
