import _Markdown, {Options} from "react-markdown";
import remarkGfm from 'remark-gfm';



export default function Markdown(args: Options) {
  return (
    <_Markdown
      remarkPlugins={[remarkGfm]}
      {...args}
      />
  )
}
