// TermsSection.tsx
interface TermsSectionProps {
  title: string;
  description: string | null;
  contents: Array<string | Array<string | string[]>> | null;
}

export default function TermsSection({ title, description, contents }: TermsSectionProps) {
  const renderContents = (contents: Array<string | Array<string | string[]>> | null, level = 0, parentIndex = 0) => {
    if (!contents || contents.length === 0) {
      return null;
    }
    
    const koreanIndex = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];
    let currentIndex = parentIndex;

    return (
      <ul className={`space-y-2 ${level > 0 ? 'ml-4' : ''}`}>
        {contents ? contents.map((content, index) => {
          if (typeof content === 'string') {
            currentIndex++;
            let displayIndex;
            if (level === 1) {
              displayIndex = koreanIndex[(currentIndex - 1) % koreanIndex.length];
            } else if (level === 2) {
              displayIndex = `${currentIndex})`;
            } else {
              displayIndex = currentIndex;
            }
            return (
              <li key={`${content}`} className="flex items-start">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {displayIndex}. {content}
                  </p>
                </div>
              </li>
            );
          } else {
            return (
              <li key={`${content}`} className="flex items-start">
                <div>
                  {renderContents(content, level + 1, 0)}
                </div>
              </li>
            );
          }
        }) : null}
      </ul>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      {description && <p className={`text-gray-600 dark:text-gray-400 ${contents && contents?.length > 0 ? "mb-4" : ""}`}>{description}</p>}
      {renderContents(contents)}
    </div>
  );
}