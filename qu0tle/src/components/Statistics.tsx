import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import ShareIcon from '@mui/icons-material/Share';
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import History from "./History"

export interface StatisticsProps {
    open: boolean;
	guessCount: number;
	guessed: boolean;
	onClose: () => void;
}

const Statistics = (props: StatisticsProps) => {
	const { open, guessCount, guessed, onClose } = props

	let guesses = guessed ? guessCount : 4
	let pass = "3️⃣4️⃣5️⃣6️⃣".substring(0, guesses)
    let fail = "❌".repeat(4 - guesses)
	const handleShare = () => {
        navigator.clipboard.writeText(`three456 1 \n${pass}${fail}\nhttps://three456.com`)
    }

	let today;
	if (guessed || guessCount == 5)
		today = (
			<Stack direction="row" mt={2} justifyContent="flex-end" spacing={2} alignContent="center">
				<Tooltip title="Copied to clipboard" enterTouchDelay={0} leaveDelay={1500}>
					<Button aria-label="share" color="success" variant="contained" endIcon={<ShareIcon />} onClick={handleShare}>
						<Typography>SHARE</Typography>
					</Button>
				</Tooltip>
			</Stack>
		)

  return (
    <Dialog open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
            Statistics
            <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }} >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
            <History />
            {today}
        </DialogContent>
    </Dialog>
  )
}

export default Statistics