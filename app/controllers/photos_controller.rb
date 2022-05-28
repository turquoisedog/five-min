class PhotosController < ApplicationController
  before_action :set_photo, only: %i[ show edit destroy ]

  # GET /photos or /photos.json
  def index
    @photos = Photo.all
  end

  # GET /photos/1 or /photos/1.json
  def show
  end

  # GET /photos/new
  def new
    @photo = Photo.new
  end

  # GET /photos/1/edit
  def edit
  end

  def create
    Photo.transaction do
      # compact_blank! because for some godawful reason
      # the form gets generated with a stray blank field.
      # why
      photo_params[:assets].compact_blank!.each do |asset|
        Photo.create(asset: asset)
      end
    end

    redirect_to photos_url
  end

  # def update
  #   respond_to do |format|
  #     if @photo.update(photo_params)
  #       format.html { redirect_to photo_url(@photo), notice: "Photo was successfully updated." }
  #       format.json { render :show, status: :ok, location: @photo }
  #     else
  #       format.html { render :edit, status: :unprocessable_entity }
  #       format.json { render json: @photo.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  def update
    params[:selected_photos].each do |sgid|
      puts GlobalID::Locator.locate_signed(sgid).id
    end

    respond_to do |format|
      format.json { head :ok }
    end
  end

  # DELETE /photos/1 or /photos/1.json
  def destroy
    @photo.destroy

    respond_to do |format|
      format.html { redirect_to photos_url, notice: "Photo was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def photo_params
      params.require(:photo).permit(assets: [])
    end
end