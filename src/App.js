import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- ICONS (as SVG components) ---
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const NotesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;


// --- Data for all topics and problems ---
const topicsData = [
    { name: "Arrays & Hashing", problems: [
        { name: "Two Sum", difficulty: "E", url: "https://leetcode.com/problems/two-sum/" },
        { name: "Group Anagrams", difficulty: "M", url: "https://leetcode.com/problems/group-anagrams/" },
        { name: "Top K Frequent Elements", difficulty: "M", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
        { name: "Product of Array Except Self", difficulty: "M", url: "https://leetcode.com/problems/product-of-array-except-self/" },
        { name: "Longest Consecutive Sequence", difficulty: "M", url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
        { name: "Encode and Decode Strings", difficulty: "M", url: "https://leetcode.com/problems/encode-and-decode-strings/" },
    ]},
    { name: "Two Pointers", problems: [
        { name: "Valid Palindrome", difficulty: "E", url: "https://leetcode.com/problems/valid-palindrome/" },
        { name: "Two Sum II - Input Array Is Sorted", difficulty: "M", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
        { name: "3Sum", difficulty: "M", url: "https://leetcode.com/problems/3sum/" },
        { name: "Container With Most Water", difficulty: "M", url: "https://leetcode.com/problems/container-with-most-water/" },
        { name: "Trapping Rain Water", difficulty: "H", url: "https://leetcode.com/problems/trapping-rain-water/" },
    ]},
    { name: "Sliding Window", problems: [
        { name: "Best Time to Buy & Sell Stock", difficulty: "E", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
        { name: "Longest Substring Without Repeating Characters", difficulty: "M", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { name: "Longest Repeating Character Replacement", difficulty: "M", url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
        { name: "Permutation in String", difficulty: "M", url: "https://leetcode.com/problems/permutation-in-string/" },
        { name: "Minimum Window Substring", difficulty: "H", url: "https://leetcode.com/problems/minimum-window-substring/" },
        { name: "Sliding Window Maximum", difficulty: "H", url: "https://leetcode.com/problems/sliding-window-maximum/" },
    ]},
    { name: "Stack & Monotonic", problems: [
        { name: "Valid Parentheses", difficulty: "E", url: "https://leetcode.com/problems/valid-parentheses/" },
        { name: "Min Stack", difficulty: "M", url: "https://leetcode.com/problems/min-stack/" },
        { name: "Daily Temperatures", difficulty: "M", url: "https://leetcode.com/problems/daily-temperatures/" },
        { name: "Generate Parentheses", difficulty: "M", url: "https://leetcode.com/problems/generate-parentheses/" },
        { name: "Car Fleet", difficulty: "M", url: "https://leetcode.com/problems/car-fleet/" },
        { name: "Largest Rectangle in Histogram", difficulty: "H", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
    ]},
    { name: "Binary Search", problems: [
        { name: "Binary Search", difficulty: "E", url: "https://leetcode.com/problems/binary-search/" },
        { name: "Search a 2D Matrix", difficulty: "M", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
        { name: "Find Minimum in Rotated Sorted Array", difficulty: "M", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
        { name: "Search in Rotated Sorted Array", difficulty: "M", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
        { name: "Koko Eating Bananas", difficulty: "M", url: "https://leetcode.com/problems/koko-eating-bananas/" },
        { name: "Median of Two Sorted Arrays", difficulty: "H", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    ]},
    { name: "Linked List", problems: [
        { name: "Reverse Linked List", difficulty: "E", url: "https://leetcode.com/problems/reverse-linked-list/" },
        { name: "Merge Two Sorted Lists", difficulty: "E", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
        { name: "Add Two Numbers", difficulty: "M", url: "https://leetcode.com/problems/add-two-numbers/" },
        { name: "LRU Cache", difficulty: "M", url: "https://leetcode.com/problems/lru-cache/" },
        { name: "Merge K Sorted Lists", difficulty: "H", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
        { name: "Reverse Nodes in K-Group", difficulty: "H", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
    ]},
    { name: "Greedy & Arrays", problems: [
        { name: "Maximum Subarray", difficulty: "E", url: "https://leetcode.com/problems/maximum-subarray/" },
        { name: "Jump Game", difficulty: "M", url: "https://leetcode.com/problems/jump-game/" },
        { name: "Jump Game II", difficulty: "M", url: "https://leetcode.com/problems/jump-game-ii/" },
        { name: "Gas Station", difficulty: "M", url: "https://leetcode.com/problems/gas-station/" },
        { name: "Partition Labels", difficulty: "M", url: "https://leetcode.com/problems/partition-labels/" },
        { name: "Valid Parenthesis String", difficulty: "M", url: "https://leetcode.com/problems/valid-parenthesis-string/" },
    ]},
    { name: "Intervals", problems: [
        { name: "Meeting Rooms", difficulty: "E", url: "https://leetcode.com/problems/meeting-rooms/" },
        { name: "Insert Interval", difficulty: "M", url: "https://leetcode.com/problems/insert-interval/" },
        { name: "Merge Intervals", difficulty: "M", url: "https://leetcode.com/problems/merge-intervals/" },
        { name: "Non-overlapping Intervals", difficulty: "M", url: "https://leetcode.com/problems/non-overlapping-intervals/" },
        { name: "Meeting Rooms II", difficulty: "M", url: "https://leetcode.com/problems/meeting-rooms-ii/" },
        { name: "Minimum Interval to Include Each Query", difficulty: "H", url: "https://leetcode.com/problems/minimum-interval-to-include-each-query/" },
    ]},
    { name: "Math & Matrix", problems: [
        { name: "Happy Number", difficulty: "E", url: "https://leetcode.com/problems/happy-number/" },
        { name: "Set Matrix Zeroes", difficulty: "M", url: "https://leetcode.com/problems/set-matrix-zeroes/" },
        { name: "Rotate Image", difficulty: "M", url: "https://leetcode.com/problems/rotate-image/" },
        { name: "Spiral Matrix", difficulty: "M", url: "https://leetcode.com/problems/spiral-matrix/" },
        { name: "Pow(x, n)", difficulty: "M", url: "https://leetcode.com/problems/powx-n/" },
        { name: "Detect Squares", difficulty: "H", url: "https://leetcode.com/problems/detect-squares/" },
    ]},
    { name: "Trees & BST", problems: [
        { name: "Maximum Depth of Binary Tree", difficulty: "E", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
        { name: "Binary Tree Level Order Traversal", difficulty: "M", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
        { name: "Validate Binary Search Tree", difficulty: "M", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
        { name: "Lowest Common Ancestor of a BST", difficulty: "M", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
        { name: "Binary Tree Maximum Path Sum", difficulty: "H", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
        { name: "Serialize and Deserialize Binary Tree", difficulty: "H", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
    ]},
    { name: "Heaps / Design", problems: [
        { name: "Kth Largest Element in a Stream", difficulty: "E", url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
        { name: "K Closest Points to Origin", difficulty: "M", url: "https://leetcode.com/problems/k-closest-points-to-origin/" },
        { name: "Kth Largest Element in an Array", difficulty: "M", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
        { name: "Task Scheduler", difficulty: "M", url: "https://leetcode.com/problems/task-scheduler/" },
        { name: "Design Twitter", difficulty: "M", url: "https://leetcode.com/problems/design-twitter/" },
        { name: "Find Median From Data Stream", difficulty: "H", url: "https://leetcode.com/problems/find-median-from-data-stream/" },
    ]},
    { name: "Backtracking + Trie", problems: [
        { name: "Subsets", difficulty: "M", url: "https://leetcode.com/problems/subsets/" },
        { name: "Combination Sum", difficulty: "M", url: "https://leetcode.com/problems/combination-sum/" },
        { name: "Combination Sum II", difficulty: "M", url: "https://leetcode.com/problems/combination-sum-ii/" },
        { name: "Permutations", difficulty: "M", url: "https://leetcode.com/problems/permutations/" },
        { name: "Palindrome Partitioning", difficulty: "M", url: "https://leetcode.com/problems/palindrome-partitioning/" },
        { name: "Word Search II", difficulty: "H", url: "https://leetcode.com/problems/word-search-ii/" },
    ]},
    { name: "Graphs", problems: [
        { name: "Number of Islands", difficulty: "M", url: "https://leetcode.com/problems/number-of-islands/" },
        { name: "Clone Graph", difficulty: "M", url: "https://leetcode.com/problems/clone-graph/" },
        { name: "Course Schedule", difficulty: "M", url: "https://leetcode.com/problems/course-schedule/" },
        { name: "Course Schedule II", difficulty: "M", url: "https://leetcode.com/problems/course-schedule-ii/" },
        { name: "Pacific Atlantic Water Flow", difficulty: "M", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
        { name: "Word Ladder", difficulty: "H", url: "https://leetcode.com/problems/word-ladder/" },
    ]},
     { name: "Advanced Graphs", problems: [
        { name: "Network Delay Time", difficulty: "M", url: "https://leetcode.com/problems/network-delay-time/" },
        { name: "Redundant Connection", difficulty: "M", url: "https://leetcode.com/problems/redundant-connection/" },
        { name: "Min Cost to Connect All Points", difficulty: "M", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
        { name: "Cheapest Flights Within K Stops", difficulty: "M", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
        { name: "Reconstruct Itinerary", difficulty: "H", url: "https://leetcode.com/problems/reconstruct-itinerary/" },
        { name: "Swim in Rising Water", difficulty: "H", url: "https://leetcode.com/problems/swim-in-rising-water/" },
    ]},
    { name: "DP", problems: [
        { name: "Climbing Stairs", difficulty: "E", url: "https://leetcode.com/problems/climbing-stairs/" },
        { name: "House Robber", difficulty: "M", url: "https://leetcode.com/problems/house-robber/" },
        { name: "House Robber II", difficulty: "M", url: "https://leetcode.com/problems/house-robber-ii/" },
        { name: "Coin Change", difficulty: "M", url: "https://leetcode.com/problems/coin-change/" },
        { name: "Decode Ways", difficulty: "M", url: "https://leetcode.com/problems/decode-ways/" },
        { name: "Word Break", difficulty: "M", url: "https://leetcode.com/problems/word-break/" },
    ]},
    { name: "DP - Part 2", problems: [
        { name: "Longest Common Subsequence", difficulty: "M", url: "https://leetcode.com/problems/longest-common-subsequence/" },
        { name: "Coin Change II", difficulty: "M", url: "https://leetcode.com/problems/coin-change-ii/" },
        { name: "Target Sum", difficulty: "M", url: "https://leetcode.com/problems/target-sum/" },
        { name: "Interleaving String", difficulty: "H", url: "https://leetcode.com/problems/interleaving-string/" },
        { name: "Distinct Subsequences", difficulty: "H", url: "https://leetcode.com/problems/distinct-subsequences/" },
        { name: "Edit Distance", difficulty: "H", url: "https://leetcode.com/problems/edit-distance/" },
    ]},
    { name: "Bit Manipulation", problems: [
        { name: "Single Number", difficulty: "E", url: "https://leetcode.com/problems/single-number/" },
        { name: "Number of 1 Bits", difficulty: "E", url: "https://leetcode.com/problems/number-of-1-bits/" },
        { name: "Counting Bits", difficulty: "E", url: "https://leetcode.com/problems/counting-bits/" },
        { name: "Reverse Bits", difficulty: "E", url: "https://leetcode.com/problems/reverse-bits/" },
        { name: "Sum of Two Integers", difficulty: "M", url: "https://leetcode.com/problems/sum-of-two-integers/" },
        { name: "Reverse Integer", difficulty: "M", url: "https://leetcode.com/problems/reverse-integer/" },
    ]},
];

// --- Helper Functions & Hooks ---
const getProblemId = (topicName, problemName) => `${topicName.replace(/\s+/g, '-')}-${problemName.replace(/\s+/g, '-')}`;

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };
    return [storedValue, setValue];
};

const ThemeSwitcher = ({ theme, setTheme }) => {
    // Only light and dark themes, only icons
    const themes = [
        { name: 'light', icon: <SunIcon /> },
        { name: 'dark', icon: <MoonIcon /> },
    ];
    const [open, setOpen] = useState(false);
    const current = themes.find(t => t.name === theme) || themes[0];

    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (!e.target.closest('.theme-dropdown')) setOpen(false);
        };
        window.addEventListener('mousedown', handler);
        return () => window.removeEventListener('mousedown', handler);
    }, [open]);

    return (
        <div
            className="fixed z-50 theme-dropdown"
            style={{
                top: '1rem',
                right: '1rem',
                left: 'auto',
                width: 'auto',
                maxWidth: 'calc(100vw - 2rem)',
            }}
        >
            <button
                className={`flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`}
                onClick={() => setOpen(v => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                style={{ minWidth: 40, minHeight: 40 }}
            >
                {current.icon}
                <svg className={`ml-1 transition-transform ${open ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {open && (
                <ul className="absolute right-0 mt-2 w-14 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 animate-fade-in" role="listbox">
                    {themes.filter(t => t.name !== theme).map(t => (
                        <li key={t.name}>
                            <button
                                className="flex items-center justify-center w-full p-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-800 dark:text-gray-100"
                                onClick={() => { setTheme(t.name); setOpen(false); }}
                                role="option"
                                aria-selected={theme === t.name}
                                style={{ minWidth: 36, minHeight: 36 }}
                            >
                                {t.icon}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


// --- Customizable Revision Intervals ---
const getStoredIntervals = () => {
    try {
        const val = window.localStorage.getItem('dsaAscentIntervals');
        if (val) {
            const arr = JSON.parse(val);
            if (Array.isArray(arr) && arr.every(x => typeof x === 'number')) return arr;
        }
    } catch {}
    return [1, 3, 7, 14, 30, 90];
};

const setStoredIntervals = (arr) => {
    window.localStorage.setItem('dsaAscentIntervals', JSON.stringify(arr));
};

const getNextRevisionDate = (stage) => {
    const intervals = getStoredIntervals();
    const daysToAdd = intervals[Math.min(stage, intervals.length - 1)];
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
};
// --- Revision Interval Modal ---
function IntervalsModal({ open, onClose, onSave, current }) {
    const [input, setInput] = useState(current.join(", "));
    const [error, setError] = useState("");
    if (!open) return null;
    const handleSave = () => {
        const arr = input.split(',').map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x) && x > 0);
        if (arr.length === 0) {
            setError("Please enter at least one valid positive number.");
            return;
        }
        onSave(arr);
        onClose();
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-xs">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Set Revision Intervals</h3>
                <p className="text-xs text-gray-500 mb-2">Enter days separated by commas (e.g. 1,3,7,14,30,90)</p>
                <input
                    className="w-full p-2 border rounded-md mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
                <div className="flex justify-end gap-2 mt-2">
                    <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                    <button onClick={handleSave} className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
                </div>
            </div>
        </div>
    );
}

// --- Reusable Components ---

const ProgressBar = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return (
        <div className="w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-full h-4 shadow-inner overflow-hidden">
            <div
                className="h-4 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500 dark:from-blue-500 dark:via-blue-700 dark:to-blue-600 shadow-lg animate-progress-bar"
                style={{ width: `${percentage}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            ></div>
        </div>
    );
};

const DifficultyBadge = ({ difficulty }) => {
    const styles = {
        E: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        M: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        H: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[difficulty]}`}>
            {difficulty}
        </span>
    );
};

const StatusSelector = ({ status, onChange }) => {
    const statuses = {
        'Not Started': 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300',
        'Attempted': 'bg-yellow-400 dark:bg-yellow-600 text-white',
        'Solved': 'bg-green-500 dark:bg-green-600 text-white',
        'Review': 'bg-purple-500 dark:bg-purple-600 text-white',
    };
    const statusCycle = ['Not Started', 'Attempted', 'Solved'];
    
    const handleClick = () => {
        if (status === 'Review') return; // In review cycle, can't change from here
        const currentIndex = statusCycle.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusCycle.length;
        onChange(statusCycle[nextIndex]);
    };

    return (
        <button onClick={handleClick} className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${statuses[status]}`} disabled={status === 'Review'}>
            {status}
        </button>
    );
};

const NotesModal = ({ problem, notes, onSave, onClose }) => {
    const [text, setText] = useState(notes);

    const handleSave = () => {
        onSave(text);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notes for {problem.name}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><CloseIcon /></button>
                </div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-40 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Your notes, thoughts, or key takeaways..."
                ></textarea>
                <div className="mt-4 flex justify-end">
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
};

const ProblemItem = ({ topicName, problem, problemState, onStatusChange, onNotesClick, onCheckboxChange }) => {
    const problemId = getProblemId(topicName, problem.name);
    const status = problemState?.status || 'Not Started';

    return (
        <li className="grid grid-cols-4 items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            {/* Status (extreme left) */}
            <div className="flex items-center justify-center">
                <StatusSelector status={status} onChange={(newStatus) => onStatusChange(problemId, newStatus)} />
            </div>
            {/* Problem Name */}
            <div className="truncate">
                <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium truncate ml-1 ${status === 'Solved' || status === 'Review' ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-800 dark:text-gray-200'}`}
                    style={{maxWidth: '12rem'}}
                >
                    {problem.name}
                </a>
            </div>
            {/* Notes */}
            <div className="flex justify-center">
                <button onClick={() => onNotesClick(problem)} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                    <NotesIcon />
                </button>
            </div>
            {/* Checkbox + Level (rightmost) */}
            <div className="flex items-center justify-center">
                {(status === 'Solved' || status === 'Review') && (
                    <input
                        type="checkbox"
                        checked={true}
                        onChange={() => onCheckboxChange(problemId)}
                        className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-1"
                        title="Mark as not solved"
                    />
                )}
                <DifficultyBadge difficulty={problem.difficulty} />
            </div>
        </li>
    );
};

const TopicCard = ({ topic, problems, problemData, onStatusChange, onNotesClick, onCheckboxChange }) => {
    const completedCount = useMemo(() => 
        problems.filter(p => {
            const state = problemData[getProblemId(topic.name, p.name)];
            return state?.status === 'Solved' || state?.status === 'Review';
        }).length
    , [problems, problemData, topic.name]);

    const totalCount = problems.length;
    if (totalCount === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{topic.name}</h3>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{completedCount} / {totalCount}</span>
            </div>
            <ProgressBar current={completedCount} total={totalCount} />
            {/* Column Headers */}
            <div className="mt-6 mb-2 px-2 hidden sm:grid grid-cols-4 w-full text-xs font-semibold text-gray-500 dark:text-gray-400 select-none">
                <div className="flex justify-center">Status</div>
                <div>Problem</div>
                <div className="flex justify-center">Notes</div>
                <div className="flex justify-center">Level</div>
            </div>
            <ul className="space-y-1">
                {problems.map(problem => (
                    <ProblemItem
                        key={problem.name}
                        topicName={topic.name}
                        problem={problem}
                        problemState={problemData[getProblemId(topic.name, problem.name)]}
                        onStatusChange={onStatusChange}
                        onNotesClick={onNotesClick}
                        onCheckboxChange={onCheckboxChange}
                    />
                ))}
            </ul>
        </div>
    );
};



const RevisionQueue = ({ problems, onReviewed, onSetIntervals }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <ClockIcon className="text-blue-600 dark:text-blue-400"/>
                    <h2 className="text-xl font-bold dark:text-white">Revision Queue{problems.length > 0 ? ` (${problems.length})` : ''}</h2>
                </div>
                <button
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-xs font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    onClick={onSetIntervals}
                    title="Set revision intervals"
                >
                    Set Revision Intervals
                </button>
            </div>
            {problems.length === 0 ? (
                <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">No problems to review today. Great job!</p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {problems.map(({ problem, topicName }) => (
                        <li key={problem.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:underline">{problem.name}</a>
                                <span className="text-xs text-gray-500 dark:text-gray-400">({topicName})</span>
                            </div>
                            <button onClick={() => onReviewed(getProblemId(topicName, problem.name))} className="bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600">
                                Reviewed
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// --- Main App Component ---


export default function App() {
    const [problemData, setProblemData] = useLocalStorage('dsaAscentData', {});
    const [theme, setTheme] = useLocalStorage('theme', 'system');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [activeNotesProblem, setActiveNotesProblem] = useState(null);
    const [revisionQueue, setRevisionQueue] = useState([]);
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
    const [intervalsModalOpen, setIntervalsModalOpen] = useState(false);
    const [intervals, setIntervals] = useState(getStoredIntervals());

    // Theme handling effect
    useEffect(() => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        root.classList.toggle('dark', isDark);
    }, [theme]);

    // Revision queue calculation effect
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const dueProblems = [];
        topicsData.forEach(topic => {
            topic.problems.forEach(problem => {
                const problemId = getProblemId(topic.name, problem.name);
                const state = problemData[problemId];
                if (state?.status === 'Review' && state.nextRevisionDate <= today) {
                    dueProblems.push({ problem, topicName: topic.name });
                }
            });
        });
        setRevisionQueue(dueProblems);
    }, [problemData, intervals]);

    // Keep intervals in sync with localStorage
    useEffect(() => {
        setStoredIntervals(intervals);
    }, [intervals]);

    const handleStatusChange = useCallback((problemId, newStatus) => {
        setProblemData(prevData => {
            const newState = { ...prevData[problemId], status: newStatus };
            if (newStatus === 'Solved') {
                newState.status = 'Review';
                newState.revisionStage = 0;
                newState.nextRevisionDate = getNextRevisionDate(0);
            }
            return { ...prevData, [problemId]: newState };
        });
    }, [setProblemData]);

    const handleReviewed = useCallback((problemId) => {
        setProblemData(prevData => {
            const currentStage = prevData[problemId]?.revisionStage || 0;
            const nextStage = currentStage + 1;
            const newState = { 
                ...prevData[problemId], 
                revisionStage: nextStage,
                nextRevisionDate: getNextRevisionDate(nextStage)
            };
            return { ...prevData, [problemId]: newState };
        });
    }, [setProblemData]);

    const handleSaveNote = useCallback((problemId, notes) => {
        setProblemData(prevData => ({
            ...prevData,
            [problemId]: { ...prevData[problemId], notes: notes }
        }));
    }, [setProblemData]);

    const filteredTopics = useMemo(() => {
        return topicsData.map(topic => ({
            ...topic,
            problems: topic.problems.filter(p => {
                const problemId = getProblemId(topic.name, p.name);
                const state = problemData[problemId] || {};
                const status = state.status || 'Not Started';
                return (
                    (p.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (statusFilter === 'All' || status === statusFilter) &&
                    (difficultyFilter === 'All' || p.difficulty === difficultyFilter)
                );
            })
        })).filter(topic => topic.problems.length > 0);
    }, [searchTerm, statusFilter, difficultyFilter, problemData]);

    const totalProblems = useMemo(() => topicsData.reduce((sum, topic) => sum + topic.problems.length, 0), []);
    const completedProblems = useMemo(() => Object.values(problemData).filter(p => p.status === 'Solved' || p.status === 'Review').length, [problemData]);
    const overallPercentage = totalProblems > 0 ? ((completedProblems / totalProblems) * 100).toFixed(0) : 0;


    const handleCheckboxChange = useCallback((problemId) => {
        setProblemData(prevData => {
            const newState = { status: 'Not Started' };
            return { ...prevData, [problemId]: newState };
        });
    }, [setProblemData]);

    return (
        <>
            <IntervalsModal
                open={intervalsModalOpen}
                onClose={() => setIntervalsModalOpen(false)}
                onSave={arr => setIntervals(arr)}
                current={intervals}
            />
            {/* Modal Disclaimer Overlay */}
            {!disclaimerAccepted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 select-none animate-fade-in" style={{backdropFilter: 'blur(2px)'}}>
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center border border-blue-200 dark:border-gray-700">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 shadow-lg">
                            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 2"/></svg>
                        </div>
                        <h2 className="mt-12 text-2xl font-bold mb-3 text-blue-800 dark:text-blue-200 tracking-tight">Welcome to DSA Ascent</h2>
                        <p className="text-gray-700 dark:text-gray-200 mb-6 text-center text-base max-w-lg">
                            <span className="font-bold text-blue-700 dark:text-blue-300">Note:</span> This roadmap is specifically designed to save you time and accelerate your placement preparation. It's a focused guide, built from experience, that cuts through the noise so you can master the most important DSA concepts efficiently.<br/><br/>
                            Get ready to learn faster and smarter. <span className="text-blue-600 dark:text-blue-300 font-semibold">Happy Coding&nbsp;!</span>
                        </p>
                        <button
                            className="mt-2 px-7 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                            onClick={() => setDisclaimerAccepted(true)}
                        >
                            Continue
                        </button>
                        <span className="mt-6 text-xs text-gray-400 dark:text-gray-500 text-center">By Abhinay Manikanti • All rights reserved</span>
                    </div>
                </div>
            )}
            {/* Main Content, blocked by modal if not accepted */}
            <div className={`min-h-screen w-full font-sans transition-colors bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-200 ${!disclaimerAccepted ? 'pointer-events-none select-none opacity-40' : ''}`}>
                {activeNotesProblem && (
                    <NotesModal 
                        problem={activeNotesProblem}
                        notes={problemData[getProblemId(activeNotesProblem.topicName, activeNotesProblem.name)]?.notes || ''}
                        onSave={(notes) => handleSaveNote(getProblemId(activeNotesProblem.topicName, activeNotesProblem.name), notes)}
                        onClose={() => setActiveNotesProblem(null)}
                    />
                )}
                <header className="mb-10 flex flex-col items-center justify-center text-center relative w-full">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-gray-900 dark:text-white mt-12 drop-shadow-sm" style={{letterSpacing: '0.04em'}}>DSA Ascent</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 mb-2">Your Personalized Placement Journey</p>
                </header>
                <div className="theme-switcher-responsive">
                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                </div>
                <section className="w-full mb-10 px-0 md:px-8">
                    <div className="w-full max-w-5xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl border border-blue-100 dark:border-gray-700 p-8 hover:shadow-blue-200 dark:hover:shadow-purple-900 transition-shadow duration-300">
                        <div className="flex flex-col items-center mb-6 gap-2">
                            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 tracking-wide">Overall Progress</h2>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{completedProblems}/{totalProblems} ({overallPercentage}%)</span>
                        </div>
                        <ProgressBar current={completedProblems} total={totalProblems} />
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input 
                                type="text"
                                placeholder="Search problems..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            />
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                <option value="All">All Statuses</option>
                                <option value="Not Started">Not Started</option>
                                <option value="Attempted">Attempted</option>
                                <option value="Solved">Solved</option>
                                <option value="Review">Review</option>
                            </select>
                            <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                <option value="All">All Difficulties</option>
                                <option value="E">Easy</option>
                                <option value="M">Medium</option>
                                <option value="H">Hard</option>
                            </select>
                        </div>
                    </div>
                </section>
                <section className="w-full mb-10 px-0 md:px-8">
                    <div className="w-full max-w-5xl mx-auto">
                        <RevisionQueue
                            problems={revisionQueue}
                            onReviewed={handleReviewed}
                            onSetIntervals={() => setIntervalsModalOpen(true)}
                        />
                    </div>
                </section>
                <section className="w-full mb-10 px-0 md:px-8">
                    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
                        {filteredTopics.map(topic => (
                            <div key={topic.name} className="w-full">
                                <TopicCard
                                    topic={topic}
                                    problems={topic.problems}
                                    problemData={problemData}
                                    onStatusChange={handleStatusChange}
                                    onNotesClick={(problem) => setActiveNotesProblem({...problem, topicName: topic.name})}
                                    onCheckboxChange={handleCheckboxChange}
                                />
                            </div>
                        ))}
                    </div>
                </section>
                <footer className="text-center mt-4 py-2 w-full">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        For the community, by a fellow learner. A Initiative by
                        <span
                            className="inline-block font-semibold text-blue-700 dark:text-blue-400 ml-2 text-base tracking-wide"
                        >
                            Abhinay Manikanti
                        </span>.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        For any suggestions or queries, you can contact <a href="mailto:manikantiabhinay@gmail.com" className="underline hover:text-blue-600 dark:hover:text-blue-400">manikantiabhinay@gmail.com</a>
                    </p>
                    <div className="h-3.5" />
                </footer>
            </div>
        </>
    );
}
