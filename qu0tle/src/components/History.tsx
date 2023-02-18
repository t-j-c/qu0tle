import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocalStorage } from '../utils/useLocalStorage';

export interface HistoryProps {
	values: Record<number, number>;
}

const History = () => {
	const { value: historyProps, setValue: setHistoryProps } = useLocalStorage<HistoryProps>("historyProps", {
		values: { [1]: 0, [2]: 0, [3]: 0, [4]: 0 }
	});

	return (
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">3️⃣</TableCell>
                    <TableCell align="center">4️⃣</TableCell>
                    <TableCell align="center">5️⃣</TableCell>
                    <TableCell align="center">6️⃣</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key="row1" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{historyProps.values[1]}</TableCell>
                    <TableCell align="center">{historyProps.values[2]}</TableCell>
                    <TableCell align="center">{historyProps.values[3]}</TableCell>
                    <TableCell align="center">{historyProps.values[4]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
	)
}

export default History