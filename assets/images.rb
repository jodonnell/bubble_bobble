require 'RMagick'
include Magick

def grab_row(y, images)
  images.size.times do |num|
    grab_square num * 30 + 1, y, 16, 17, images, true, num
  end
end

def grab_row_with_bubbles(y, images)
  images.size.times do |num|
    next if num == 2 or num == 3 or num == 4

    if num > 4
      x_num = num - 1
    else
      x_num = num
    end
    grab_square x_num * 30 + 1, y, 16, 17, images, false, num
  end
end


def grab_square(x, y, width, height, images, flop, frame_num)

  original_image = ImageList.new("bubblebobble_bubandbub_sheet.png")

  image = original_image.crop(x, y, width, height)
  image = image.scale(3)
  image = image.transparent('#010000', (Magick::TransparentOpacity-Magick::OpaqueOpacity).abs)

  image.write("#{images[frame_num]}.png")
  if flop
    image = image.flop
    image.write("#{images[frame_num]}_left.png")
  end
end

bub_images = ['bub', 'bub_tail', 'bub_walk_tail', 'bub_walk', 'bub_jump', 'bub_jump_tail', 'bub_fall_tail', 'bub_fall']
grab_row(68, bub_images)

bub_other_images = ['bub_facing_forward_leg', 'bub_facing_forward', 'smallest_bubble', 'small_bubble', 'medium_bubble', 'big_bubble', 'bub_die', 'bub_die_90', 'bub_die_270', 'bub_die_180']
grab_row_with_bubbles(38, bub_other_images)
