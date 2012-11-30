require 'RMagick'
include Magick

class CreateImages
  def initialize image_name, image_names, y
    @image_name = image_name
    @y = y
    @image_names = image_names
  end

  def grab_row
    @image_names.size.times do |num|
      next if File.exists? "#{@image_names[num]}.png"

      grab_square num * 30 + 1, 16, 17, true, num
    end

    def grab_row_with_bubbles
      @image_names.size.times do |num|
        next if num == 2 or num == 3 or num == 4

        if num > 4
          x_num = num - 1
        else
          x_num = num
        end

        next if File.exists? "#{@image_names[num]}.png"
        grab_square x_num * 30 + 1, 16, 17, @image_names, false, num
      end

      
      grab_square(61, 16, 17, false, 2) unless File.exists? "#{@image_names[2]}.png"
      grab_square(80, 16, 17, false, 3) unless File.exists? "#{@image_names[3]}.png"
      grab_square(99, 16, 17, false, 4) unless File.exists? "#{@image_names[4]}.png"
    end


    def grab_square(x, width, height, flop, frame_num)
      original_image = ImageList.new(@image_name)

      image = original_image.crop(x, @y, width, height)
      image = image.scale(3)
      image = image.transparent('#010000', (Magick::TransparentOpacity-Magick::OpaqueOpacity).abs)

      image.write("#{@image_names[frame_num]}.png")
      if flop
        image = image.flop
        image.write("#{@image_names[frame_num]}_left.png")
      end
    end
  end
end

bub_images = ['bub', 'bub_tail', 'bub_walk_tail', 'bub_walk', 'bub_jump', 'bub_jump_tail', 'bub_fall_tail', 'bub_fall']
ci = CreateImages.new("bubblebobble_bubandbub_sheet.png", bub_images, 68)
ci.grab_row

bub_other_images = ['bub_facing_forward_leg', 'bub_facing_forward', 'smallest_bubble', 'small_bubble', 'medium_bubble', 'big_bubble', 'bub_die', 'bub_die_90', 'bub_die_270', 'bub_die_180']
ci = CreateImages.new("bubblebobble_bubandbub_sheet.png", bub_other_images, 38)
ci.grab_row_with_bubbles

blue_magoo_images = ['blue_magoo', 'blue_magoo_walk', 'blue_magoo_walk_leg']
ci = CreateImages.new("bubblebobble_enemies_sheet.png", blue_magoo_images, 0)
ci.grab_row
