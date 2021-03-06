import React from 'react'
import firebase from '../firebase'
import { Plugins } from '@capacitor/core'
import UserContext from '../contexts/UserContext';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';
import { closeCircleOutline } from 'ionicons/icons';
import LinkItem from '../components/Link/LinkItem';
import CommentModal from '../components/Link/CommentModal';
import LinkComment from '../components/Link/LinkComment'

const { Browser } = Plugins;

const Link = (props) => {
    const { user } = React.useContext(UserContext);
    const [link, setLink] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const linkId = props.match.params.linkId;
    const linkRef = firebase.db.collection("links").doc(linkId);

    function handleDeleteLink() {
        linkRef
            .delete()
            .then(() => {
                console.log(`Document with ID ${link.id} deleted`);
            }).catch((err) => {
                console.error('Error deleting document', err);
            });
        props.history.push("/");
    }

    function handleOpenModal() {
        if (!user) {
            props.history.push("/login");  
        } else {
            setShowModal(true);
        }
    }

    function handleAddComment(commentText) {
        if (!user) {
            props.history.push("/login");  
        } else {
            linkRef.get().then((doc) => {
                if (doc.exists) {
                    const prevComments = doc.data().comments;
                    const comment = { 
                        postedBy: { id: user.uid, name: user.displayName },
                        created: Date.now(),
                        text: commentText
                    };
                    const updatedComments = [...prevComments, comment];
                    linkRef.update({comments: updatedComments});
                    setLink((prevState) => ({
                        ...prevState,
                        comments: updatedComments
                    }))
                }
            })
            setShowModal(false);
        }  
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    function postedByAuthUser(link) {
        return user && user.uid === link.postedBy.id;
    }

    React.useEffect(() => {
        getLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [linkId]);

    function handleAddVote() {
        if (!user) {
            props.history.push("/login");
        } else {
            linkRef.get().then((doc) => {
                if (doc.exists) {
                    const prevVotes = doc.data().votes;
                    const vote = { votedBy: { id: user.uid, name: user.displayName }};
                    const updatedVotes = [...prevVotes, vote];
                    const voteCount = updatedVotes.length;
                    linkRef.update({votes: updatedVotes, voteCount});
                    setLink((prevState) => ({
                        ...prevState,
                        votes: updatedVotes,
                        voteCount: voteCount
                    }))
                }
            })
        }
    }

    function getLink() {
        linkRef.get().then((doc) => {
            setLink({...doc.data(), id: doc.id});
        });
    }

    async function openBrowser() {
        await Browser.open({
            url: link.url
        });
    }

    return (
        <IonPage>
            <NavHeader title={link && link.description} option={link && postedByAuthUser(link)}
                icon={closeCircleOutline} action={handleDeleteLink} />
                <IonContent>
                    <CommentModal isOpen={showModal} title="New Comment"
                        sendAction={handleAddComment} closeAction={handleCloseModal} />
                    {link && (
                        <>
                            <IonGrid>
                                <IonRow>
                                    <IonCol class="ion-text-center">
                                        <LinkItem link={link} browser={openBrowser} />
                                        <IonButton onClick={handleAddVote} size="small">
                                            Upvote
                                        </IonButton>
                                        <IonButton onClick={() => handleOpenModal()} size="small">
                                            Comment
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                            {link.comments.map((comment, index) => (
                                <LinkComment key={index} comment={comment}
                                    link={link} setLink={setLink} />
                                ))}
                        </>

                    )}
                </IonContent>
        </IonPage>
    )
}

export default Link
