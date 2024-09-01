import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ContainsPair {

    public static boolean containsPair(List<Integer> l) {
        Set<Integer> s = new HashSet<Integer>(l);
        return s.size() != l.size();
    }

    public static void main(String[] args) {

        List<Integer> l1 = new ArrayList<>();
        l1.add(0);
        l1.add(1);
        l1.add(2);
        l1.add(3);
        l1.add(4);
        l1.add(4);

        List<Integer> l2 = new ArrayList<>();
        for (int i = 0; i < 9; i++) {
            l2.add(i);
        }

        System.out.println("l1 should be true and the containsPair function is returning: " + containsPair(l1));
        System.out.println("l2 should be false and the containsPair function is returning: " + containsPair(l2));
    }

}