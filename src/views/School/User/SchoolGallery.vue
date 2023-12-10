<script setup lang="ts">
import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue';
import NampongFooter from '../../../components/layout/School/NampongFooter.vue';
import {imageGalleryType} from '../../../store/Interface'
import { ref } from 'vue';


interface BreadcrumbItem {
    title: string;
    disabled: boolean;
    href: string;
}

const breadcrumb = ref<BreadcrumbItem[]>([
    {
        title: 'หน้าแรก',
        disabled: false,
        href: '/',
    },
    {
        title: 'ภาพกิจกรรม',
        disabled: true,
        href: '/gallery',
    },
])

const imageGallery = ref<Array<imageGalleryType>>([
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/406308600_843473284237273_7606758257228336471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEx4rr0ZkiUNK3ceTR9HYZGem91_BzTuid6b3X8HNO6J2ORb7oLcDXWqoTnWhXXwAB4QPhLQylf7AJneX5rv9J7&_nc_ohc=dUZMTSohUAcAX_jfKac&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBUwbNw54fr2cgWZFzpNgpg-bhMdetpMkeoaQuB1JG63A&oe=656F3FD5'
        },
         
    ]
    )

</script>

<template>
    <div class="flex flex-col w-full relative min-h-screen">
        <NampongNavBar></NampongNavBar>
        <v-divider></v-divider>
        <div class="flex flex-col w-full h-full min-h-screen bg-pink-50 justify-start items-center">
            <div class="w-full h-full">
                <div class="w-full h-full flex justify-center items-center  text-xl">
                    <div class="w-[1000px] h-full bg-white">
                        <p class="text-xl py-4 border-l-8 border-pink-500 ">  
                            <v-breadcrumbs :items="breadcrumb">
                                <template v-slot:title="{ item }">
                                    <div v-if="item.disabled === true">
                                        <p class="text-gray-500">
                                            {{ item.title }}
                                        </p>
                                    </div>
                                    <div v-else>
                                        <p class="">
                                            {{ item.title }}
                                        </p>
                                    </div>
                                </template>
                            </v-breadcrumbs>
                        </p>
                        <v-divider></v-divider>
                        <div class="flex flex-wrap">
                            <div class="w-full h-full flex flex-wrap justify-start items-center p-4">
                                <div v-for="item of imageGallery" class="relative group p-1
                                xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full less:w-full 
                                xl:h-[300px] lg:h-[250px] md:h-[250px] less:h-[250px] 
                                cursur-pointer">
                                    <img class="object-cover w-full h-full duration-500
                                                group-hover:brightness-50 cursor-pointer" 
                                    :src="item.url" alt="">
                                    <div class="absolute w-full h-full p-3 text-white  top-0 flex justify-start items-end cursor-pointer
                                                scale-100 group-hover:scale-[1.01] duration-500 opacity-0 group-hover:opacity-100">
                                        <p class="line-clamp-3 text-lg">
                                        {{ item.text }} 
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- grid masonry -->
                            <!-- <div class="p-5 md:p-10">
                                <div class="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
                                    <img v-for="item of imageGallery" :src="item.url" alt="" />
                                </div>
                            </div> -->
                        </div>
                        <v-divider></v-divider>
                        <div class="mt-2 mb-4 w-full py-3">
                            <v-pagination
                                :length="4"
                                rounded="circle"
                            ></v-pagination>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    </div>
    <NampongFooter class="mt-auto"></NampongFooter>
</template>