import _Markdown, {Options} from "react-markdown";
import remarkGfm from 'remark-gfm';

function isVideoUrl(href?: string) {
  if (!href) return false;

  try {
    const url = new URL(href);

    const isGitHubAttachment =
      url.hostname === "github.com" &&
      url.pathname.startsWith("/user-attachments/assets/");

    const hasVideoExtension = /\.(mp4|webm|ogg)$/i.test(url.pathname);

    return isGitHubAttachment || hasVideoExtension;
  } catch {
    return false;
  }
}

export default function Markdown(args: Options) {
  return (
    <_Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a({ href, children, title }) {
              if (isVideoUrl(href)) {
                return <video src={href} controls preload="metadata" playsInline />;
              }

              return (
                <a href={href} title={title}>
                  {children}
                </a>
              );
            },
      }}
      {...args}
      />
  );
}
