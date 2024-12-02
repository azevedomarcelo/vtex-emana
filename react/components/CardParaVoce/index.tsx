import React from 'react'

import styles from './styles.module.css'

interface CardProps {
  image: string
  altImage: string
  tags: string
  description: string
  datePost: string
  linkText: string
  linkUrl: string
}

export function CardParaVoce(card: CardProps) {
  return (
    <section className={`${styles['card-container']}`}>
      {card && (
        <div key={`${card.altImage}`} className={styles['card-content']}>
          <img
            src={card.image}
            alt={card.altImage}
            className={styles['card-image']}
          />
          <div className={styles['card-section']}>
            <div className={styles['card-tag-container']}>
              {card.tags.split(',').map(tag => (
                <span className={styles['card-tag']} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className={styles['card-description']}>{card.description}</p>

            <div className={styles['card-footer']}>
              <span className={styles['card-data']}>{card.datePost}</span>
              <a href={card.linkUrl} className={styles['card-link']}>
                {card.linkText}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

CardParaVoce.schema = {
  title: 'Para Você',
  description: '',
  type: 'object',
  properties: {
    image: {
      title: 'Imagem do post',
      default: '',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    altImage: {
      type: 'string',
      title: 'Image Text Alternative',
      default: 'Imagem',
    },
    tags: {
      title: 'Tags',
      description: 'Separar as tags por vírgula',
      default: 'tag1, tag2',
      type: 'string',
    },
    description: {
      title: 'Descrição do post',
      description: 'Um breve resumo do post.',
      default: 'Lorem ipsum dolor sit amet',
      type: 'string',
    },
    datePost: {
      title: 'Data do post',
      default: '16/10/2024',
      type: 'string',
      format: 'date',
      widget: {
        'ui:widget': 'date',
      },
    },
    linkText: {
      title: 'Texto do link',
      default: 'Leia mais',
      type: 'string',
    },
    linkUrl: {
      title: 'URL do post',
      type: 'string',
      default: '/link-do-post',
    },
  },
}
