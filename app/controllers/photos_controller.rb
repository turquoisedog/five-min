class PhotosController < ApplicationController
  before_action :set_photo, only: %i[ show edit destroy ]

  # GET /photos or /photos.json
  def index
    @photos = Photo.all
    @groups = Group.all
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

  def update
    selected_photos = GlobalID::Locator.locate_many_signed params[:selected_photos]
    selected_groups = GlobalID::Locator.locate_many_signed params[:selected_groups]

    new_relations = selected_photos.pluck(:id)
                                   .product(selected_groups.pluck(:id))
                                   .map { |p, g| { photo_id: p, group_id: g } }

    GroupPhoto.insert_all new_relations

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
