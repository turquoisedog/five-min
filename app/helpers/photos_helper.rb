module PhotosHelper
  def filter_option_for(group)
    if group == 'ungrouped'
      text = safe_join([ 'Ungrouped', raw('<i class="bi bi-asterisk float-end"></i>') ])
    else
      text = safe_join([
                         group.name,
                         raw("<i class=\"bi bi-folder#{'-fill' if is_current_filter?(group)} float-end\"></i>")
                       ])
    end
      link_to text,
              organize_photos_path(filter_group: (group.is_a?(Group) ? group.id : 'ungrouped')),
              class: "nav-link#{' active' if is_current_filter?(group)}",
              aria_current: (true if is_current_filter?(group))
    end

  private

  def is_current_filter?(group)
    if group.is_a? Group
      params[:filter_group].to_i == group.id
    else
      params[:filter_group] == 'ungrouped'
    end
  end
end
