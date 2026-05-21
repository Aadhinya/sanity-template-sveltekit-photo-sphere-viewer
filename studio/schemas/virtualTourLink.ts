import {defineType, defineField} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Virtual Tour Linking Item',
  name: 'virtualTourLink',
  type: 'object',
  fields: [
    defineField({
      name: 'nodeID',
      type: 'reference',
      title: 'Location',
      validation: (Rule) => Rule.required(),
      to: {
        type: 'virtualTourItem',
      },
    }),
    defineField({
      name: 'textureX',
      type: 'number',
      title: 'Texture X',
    }),
    defineField({
      name: 'textureY',
      type: 'number',
      title: 'Texture Y',
      description: 'Typically half of the height of the image',
    }),
    defineField({
      name: 'linkName',
      type: 'string',
      title: 'Arrow Label',
      description: 'Optional label shown on the navigation arrow. Defaults to the target node title.',
    }),
  ],
  preview: {
    select: {
      title: 'nodeID.title',
      textureX: 'textureX',
      textureY: 'textureY',
      media: 'nodeID.image',
    },
    prepare: ({title, textureX, textureY, media}) => {
      return {
        title: title,
        subtitle: `${textureX}x, ${textureY}y`,
        media,
      }
    },
  },
})
