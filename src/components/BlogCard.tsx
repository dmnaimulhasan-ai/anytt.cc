import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

const BlogCard = ({ slug, title, excerpt, date, readTime, category, image }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${slug}`}
      className="group glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border-2 border-transparent hover:border-primary/30"
    >
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" role="img" aria-label={`Blog post: ${title}`}>
        <span className="text-4xl">{image || "📝"}</span>
      </div>
      <div className="p-5">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
          {category}
        </span>
        <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <time dateTime={date} className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          </div>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
