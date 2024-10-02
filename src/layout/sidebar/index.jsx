
import { useCallback, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import useStore from '../../store';
/*************  ✨ Codeium Command 🌟  *************/
/**
 * A sidebar component that contains a drawer with menu items and a content area.
 * The menu items are used to navigate to different parts of the application.
 * The content area is used to display the layout and elements of the current
 * 3D model.
 */
const Sidebar = () => {
    /**
     * Whether the menu is open or not.
     * @type {boolean}
     */
    const [menuOpen, setMenuOpen] = useState(false);

    /**
     * The current step in the layout process.
     * @type {number}
     */
    const [step, setStep] = useState(0);

    /**
     * Whether the content area is open or not.
     * @type {boolean}
     */
    const [contentOpen, setContent] = useState(false);

    const foundationSize = useStore((s) => s.foundationSize);
    const setFoundationSize = useStore((s) => s.setFoundationSize);

    /**
     * Handles the change event for the slider.
     * @param {number} newValue The new value of the slider.
     * @param {string} type The type of the slider, either "width" or "depth".
     */
    const handleOnChange = useCallback((newValue, type) => {
        const current = { ...foundationSize };
        current[type] = newValue / 1000;
        setFoundationSize(current);
    }, [foundationSize, setFoundationSize]);

    function valueLabelFormat(value) {
        const units = "mm"
        return `${Math.floor(value)} ${units}`;
    }

    return (
        <>
            <Drawer variant="permanent" open={contentOpen} style={{ width: contentOpen ? "324px" : "0px" }}>
                <Box className={`pt-[100px] h-full flex flex-col justify-start transition-[width] duration-700 ${contentOpen ? 'px-5' : 'px-0'}`}
                    sx={{ width: contentOpen ? '324px' : '0px', marginLeft: "50px" }}
                >
                    {
                        step === 0 &&
                        <>
                            <Box className="flex justify-between align-middle " >
                                <h1 className='py-3 w-100 border-bottom text-2xl' style={{ color: "black" }}>   Layout</h1>
                                <CloseIcon sx={{ cursor: "pointer" }} onClick={() => setContent(false)} />
                            </Box>
                            <Box>
                                <h2 className='py-3 w-100 border-bottom text-2xl' style={{ color: "black" }}>   Dimension</h2>
                                <Box>
                                    <Box width={300}>
                                        <Box component='span'>
                                            Wdith
                                        </Box>
                                        <Slider
                                            size="small"
                                            name="rwidth"
                                            value={foundationSize.width * 1000}
                                            aria-label="Small"
                                            min={2000}
                                            max={25000}
                                            valueLabelDisplay="on"
                                            getAriaValueText={valueLabelFormat}
                                            valueLabelFormat={valueLabelFormat}
                                            onChange={(e) => handleOnChange(e.target.value, "width")}
                                        />
                                        <Box component='span'>
                                            Depth
                                        </Box>
                                        <Slider
                                            size="small"
                                            name="rlength"
                                            value={foundationSize.depth * 1000}
                                            aria-label="Small"
                                            min={2000}
                                            max={25000}
                                            valueLabelDisplay="on"
                                            getAriaValueText={valueLabelFormat}
                                            valueLabelFormat={valueLabelFormat}
                                            onChange={(e) => handleOnChange(e.target.value, "depth")}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    }
                </Box>
            </Drawer>
            <Drawer variant="permanent" open={menuOpen} style={{ width: menuOpen ? "45px" : "12px" }}>
                <Box className="pt-[100px] h-full flex flex-col justify-start transition-[width] duration-700" sx={{ width: menuOpen ? '224px' : '64px' }}>
                    <Button
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setMenuOpen(!menuOpen)}
                        edge="start"
                        sx={{ width: 'fit-content' }}
                    >
                        <MenuIcon />
                    </Button>
                    <Divider />
                    <List>
                        {['Layout', 'Elements', 'Products', 'Styling'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    className='flex items-center gap-[18px]'
                                    sx={{ px: '20px', py: '16px' }}
                                    onClick={() => {
                                        setContent(true);
                                        setMenuOpen(false);
                                        setStep(index)
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ display: menuOpen ? 'block' : 'none', margin: 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Box>
            </Drawer>
        </>


    )
}

export default Sidebar