interface HeadingContentProps {
   title: string
   description: string
}

export const HeadingContent = ({ title, description }: HeadingContentProps) => {
   return (
      <span>
         <h2 className="text-3xl font-bold">{title}</h2>
         <p className="text-sm text-muted-foreground">{description}</p>
      </span>
   )
}
