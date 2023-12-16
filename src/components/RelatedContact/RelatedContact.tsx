import { Button, ButtonProps } from '../Button/Button';
import { HyphenatedText } from '../HyphenatedText/HyphenatedText';

interface RelatedContactProps {
  header?: string;
  redWord?: Array<string>;
  subHeader?: string;
  content?: string;
  buttonProps?: ButtonProps;
}

export const RelatedContact = ({ header, subHeader, content, buttonProps, redWord }: RelatedContactProps) => {
  const renderHeader = () => {
    if (!header) return null;

    const words = header.split(' ');
    return (
      <h2>
        {words.map((word, index) => (
          <span
            key={index}
            // className={word === redWord ? "text-accentCol" : ""}
            className={`${redWord?.map((redWord) => (redWord === word ? 'text-accentCol' : '')).join(' ')}`}
          >
            <HyphenatedText text={word} />{' '}
          </span>
        ))}
      </h2>
    );
  };
  return (
    <>
      <article className='flex justify-center'>
        <div className='spacer w-full'>
          {header && renderHeader()}

          <div className='flex flex-col md:flex-row gap-10'>
            <article>
              {subHeader && <h3>{subHeader}</h3>}

              {content && <p>{content}</p>}

              {buttonProps && <Button {...buttonProps} />}
            </article>
          </div>
        </div>
      </article>
    </>
  );
};
