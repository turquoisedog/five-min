module ApplicationHelper
  def nav_link(name, path)
    content_tag :li, link_to(name,
                             path,
                             class: "nav-link #{'active' if current_page? path} px-2",
                             aria_current: ('page' if current_page? path)),
                class: 'mx-1'
  end
end
