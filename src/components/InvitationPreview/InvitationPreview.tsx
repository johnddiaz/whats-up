import './InvitationPreview.scss'
import '../../__shared__/styles.scss'
import { ClientConversation } from '../../__shared__/models'

interface Props {
    invitation: ClientConversation
    onPreviewClick: (id: string) => void
}

export default function InvitationPreview(props: Props) {
    return null
    // function onPreviewClick() {
    //     props.onPreviewClick(props.conversation.id)
    // }

    // return (
    //     <div id="invitationpreview-root" onClick={onPreviewClick}>
    //         <Avatar size="sm" />
    //         <div id="invitationpreview-text-root">
    //             <h4 style={{ margin: '0 0 8px' }}>
    //                 {props.conversation.name || props.conversation.id}
    //             </h4>
    //             <h5 style={{ margin: '0' }}>
    //                 {props.conversation.otherUsers.length > 0
    //                     ? props.conversation.otherUsers.map(
    //                           (user, index, original) => {
    //                               if (
    //                                   original.length === 1 ||
    //                                   index === original.length - 1
    //                               ) {
    //                                   return user.id
    //                               } else {
    //                                   return `${user.id}, `
    //                               }
    //                           }
    //                       )
    //                     : 'No other users here.'}
    //             </h5>
    //             <p style={{ margin: '0' }}>Last message goes here.</p>
    //         </div>
    //     </div>
    // )
}
