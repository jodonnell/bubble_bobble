require 'RMagick'
include Magick

LEFT = 1
RIGHT = 2

class CreateImages
  def initialize image_name, image_names, y, facing=RIGHT
    @image_name = image_name
    @y = y
    @image_names = image_names
    @facing = facing
  end

  def grab_row
    @image_names.size.times do |num|
      next if File.exists? "#{@image_names[num]}.png"
      
      grab_square num * 30 + 1, 16, 17, true, num
    end
  end

  def grab_row_no_flop
    @image_names.size.times do |num|
      next if File.exists? "#{@image_names[num]}.png"
      
      grab_square num * 29 + 1, 16, 17, false, num
    end
  end

  def grab_row_with_bubbles
    @image_names.size.times do |num|
      next if File.exists? "#{@image_names[num]}.png"
      next if num == 2 or num == 3 or num == 4

      if num > 4
        x_num = num - 1
      else
        x_num = num
      end

      grab_square x_num * 30 + 1, 16, 17, false, num
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

    if @facing==RIGHT
      image.write("#{@image_names[frame_num]}.png")
    else
      image.write("#{@image_names[frame_num]}_left.png")
    end

    if flop
      if @image_names[frame_num].include? '_vertical'
        image = image.flip
      else
        image = image.flop
      end
      if @facing==RIGHT
        image.write("#{@image_names[frame_num]}_left.png")
      else
        image.write("#{@image_names[frame_num]}.png")
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

bob_images = ['bob', 'bob_tail', 'bob_walk_tail', 'bob_walk', 'bob_jump', 'bob_jump_tail', 'bob_fall_tail', 'bob_fall']
ci = CreateImages.new("bubblebobble_bubandbub_sheet.png", bob_images, 128)
ci.grab_row

bob_other_images = ['bob_facing_forward_leg', 'bob_facing_forward', 'smallest_bobble', 'small_bobble', 'medium_bobble', 'big_bobble', 'bob_die', 'bob_die_90', 'bob_die_270', 'bob_die_180']
ci = CreateImages.new("bubblebobble_bubandbub_sheet.png", bob_other_images, 98)
ci.grab_row_with_bubbles


blue_magoo_images = ['blue_magoo', 'blue_magoo_walk', 'blue_magoo_walk_leg', 'blue_magoo_walk_mad', 'blue_magoo_walk_leg_mad', 'blue_magoo_dead', 'blue_magoo_dead_vertical', 'blue_magoo_trapped']
ci = CreateImages.new("bubblebobble_enemies_sheet.png", blue_magoo_images, 0, LEFT)
ci.grab_row

blue_magoo_images = ['pendant', 'crystals', 'pickle', 'pepper']
ci = CreateImages.new("bubblebobble_various_sheet.png", blue_magoo_images, 29, RIGHT)
ci.grab_row_no_flop
